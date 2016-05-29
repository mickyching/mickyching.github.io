struct inode {
    umode_t                     i_mode; // 访问权限
    unsigned short              i_opflags; // 用于标识具备那些操作
#define IOP_FASTPERM    0x0001          // 没有permission()
#define IOP_LOOKUP      0x0002          // 具有lookup()
#define IOP_NOFOLLOW    0x0004          // 没有follow_link()

    unsigned int                i_flags;
#define S_SYNC          1       /* Writes are synced at once */
#define S_NOATIME       2       /* Do not update access times */
#define S_APPEND        4       /* Append-only file */
#define S_IMMUTABLE     8       /* Immutable file */
#define S_DEAD          16      /* removed, but still open directory */
#define S_NOQUOTA       32      /* Inode is not counted to quota */
#define S_DIRSYNC       64      /* Directory modifications are synchronous */
#define S_NOCMTIME      128     /* Do not update file c/mtime */
#define S_SWAPFILE      256     /* Do not truncate: swapon got its bmaps */
#define S_PRIVATE       512     /* Inode is fs-internal */
#define S_IMA           1024    /* Inode has an associated IMA struct */
#define S_AUTOMOUNT     2048    /* Automount/referral quasi-directory */
#define S_NOSEC         4096    /* no suid or xattr security attributes */

    // attrs: i_uid, i_gid, i_atime, i_mtime, i_ctime

    const inode_operations      *i_op;
    const file_operations       *i_fop;
    struct super_block          *i_sb;
    address_space               *i_mapping;
    unsigned long               i_ino;
    dev_t                       i_rdev;
    const unsigned int          i_nlink;
    loff_t                      i_size;         // 文件大小，字节数
    blkcnt_t                    i_blocks;       // 文件大小，块数
    unsigned int                i_blkbits;      // 块的位数，从sb继承

    spinlock_t                  i_lock;  // protect i_state
    unsigned short              i_bytes; // bytes consumed
    unsigned long               i_state;
#define I_DIRTY_SYNC            (1 << 0)
#define I_DIRTY_DATASYNC        (1 << 1)
#define I_DIRTY_PAGES           (1 << 2)
#define __I_NEW                 3
#define I_NEW                   (1 << __I_NEW)
#define I_WILL_FREE             (1 << 4)
#define I_FREEING               (1 << 5)
#define I_CLEAR                 (1 << 6)
#define __I_SYNC                7
#define I_SYNC                  (1 << __I_SYNC)
#define I_REFERENCED            (1 << 8)
#define __I_DIO_WAKEUP          9
#define I_DIO_WAKEUP            (1 << I_DIO_WAKEUP)
#define I_LINKABLE              (1 << 10)
#define I_DIRTY (I_DIRTY_SYNC | I_DIRTY_DATASYNC | I_DIRTY_PAGES)

    struct mutex                i_mutex;
    unsigned long               dirtied_when; // jiffies

    struct hlist_node           i_hash; // inode_hashtable
    struct list_head            i_wb_list;
    struct list_head            i_lru;  // sb->s_inode_lru & inode->i_lock
    struct list_head            i_sb_list; // sb->s_inodes
                                           // inode_sb_list_lock
    union {
        struct hlist_head       i_dentry; // 所有引用该节点的dentry
                                          // dentry->d_alias
        struct rcu_head         i_rcu;
    };
    u64                         i_version;
    atomic_t                    i_count; // iput()
    atomic_t                    i_dio_count; // direct io count
    atomic_t                    i_writecount; // 有多少个用户对该节点有写权限

    struct file_lock            *i_flock;
    struct address_space        i_data;
    struct list_head            i_devices;
    union {
        struct pipe_inode_info  *i_pipe;
        struct block_device     *i_bdev;
        struct cdev             *i_cdev;
    };

    __u32                       i_generation; // 索引节点版本号
    void                        *i_private; // private pointer
};
