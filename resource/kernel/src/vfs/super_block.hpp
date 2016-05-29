struct super_block {
    struct list_head            s_list; // super_blocks & sb_lock
    dev_t                       s_dev;  // MKDEV()
    struct block_device         *s_bdev;
    unsigned long               s_blocksize;      // 512 or 2**n
    unsigned char               s_blocksize_bits; // log2(s_blocksize)
    loff_t                      s_maxbytes; // MAX_LFS_FILESIZE
    struct file_system_type     *s_type;

    const struct super_operations       *s_op;
    const struct dquot_operations       *dq_op;
    const struct quotactl_ops           *s_qcop;
    const struct export_operations      *s_export_op;
    unsigned long                       s_flags;

#define MS_RDONLY        1              // 只读
#define MS_NOSUID        2              // 忽略GID和UID
#define MS_NODEV         4              // 不允许访问设备特殊文件
#define MS_NOEXEC        8              // 不允许执行程序
#define MS_SYNCHRONOUS  16              // 写入立即同步
#define MS_REMOUNT      32              // 更改挂载标志
#define MS_MANDLOCK     64              // 允许对FS强制锁住
#define MS_DIRSYNC      128             // 目录更改立即同步
#define MS_NOATIME      1024            // 不更新访问时间
#define MS_NODIRATIME   2048            // 不更新目录访问时间
    // ...

    unsigned long               s_magic;  // 验证磁盘信息
    struct dentry               *s_root;  // root dentry
    struct rw_semaphore         s_umount; // 读写期间防止umount
    int                         s_count; // get_super()/put_super()
    atomic_t                    s_active; // grab_super(), freeze_super()
                                          // deactivate_super()

    const struct xattr_handler  **s_xattr;
    struct list_head            s_inodes; // 所有的索引节点链表
                                          // inode->i_sb_list
                                          // inode_sb_list_lock
    struct hlist_bl_head        s_anon; // 远程网络文件系统的匿名目录项链表
    struct list_head            s_mounts; // 所有挂载点
                                          // mount->mnt_instances
                                          // mount_lock
    struct backing_dev_info     *s_bdi;
    struct mtd_info             *s_mtd;
    struct hlist_node           s_instances; // 文件系统实例节点
                                             // file_system_type->fs_supers
                                             // sb_lock
    struct quota_info           s_dquot;
    struct sb_writers           s_writers;

    char                        s_id[32]; // 设备名
    u8                          s_uuid[16];

    void                        *s_fs_info; // 指向具体文件系统的信息
    unsigned int                s_max_links; // 最大硬链接数
    fmode_t                     s_mode; // 文件操作权限
    u32                         s_time_gran; // 时间精度ns，最大为1s

    // 只有VFS会使用这个互斥锁，具体文件系统的代码不能使用
    // 这个锁用于防止把一个目录重命名为它的子目录
    struct mutex                s_vfs_rename_mutex;

    // 子类型，在/proc/mounts显示格式为"type.subtype"
    char                        *s_subtype;

    char __rcu                  *s_options; // 传递给mount()的data
    const struct dentry_operations *s_d_op; // dentry的默认操作集

    // 缓存池ID，-1表示没有缓存池
    // 只有ext3、ext4和btrfs文件系统支持这个特性
    int                         cleancache_poolid;

    struct shrinker             s_shrink;

    // number of inodes with nlink == 0 but still referenced
    atomic_long_t               s_remove_count;

    // being remounted read-only
    int                         s_readonly_remount;

    // AIO completions deferred from interrupt context
    struct workqueue_struct     *s_dio_done_wq;

    // dentry的lru链表，节点为dentry->d_lru
    struct list_lru             s_dentry_lru ____cacheline_aligned_in_smp;
    // inode的lru链表，节点为inode->i_lru
    struct list_lru             s_inode_lru ____cacheline_aligned_in_smp;
    struct rcu_head             rcu;
};
