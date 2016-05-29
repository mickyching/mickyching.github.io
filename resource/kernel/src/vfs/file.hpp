struct file {
    union {
        struct llist_node       fu_llist;
        struct rcu_head         fu_rcuhead;
    } f_u;

    struct path                 f_path;
#define f_dentry            f_path.dentry
    struct inode                *f_inode;
    const struct file_operations *f_op;
    atomic_long_t               f_count;
    unsigned int                f_flags;
    fmode_t                     f_mode;
    loff_t                      f_pos;
    struct fown_struct          f_owner;
    u64                         f_version;
    void                        *private_data;

    spinlock_t                  f_lock;
    struct mutex                f_pos_lock;
    const struct cred           *f_cred;
    struct file_ra_state        f_ra;
    struct address_space        *f_mapping;
} __attribute__((aligned(4)));
