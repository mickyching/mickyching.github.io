struct dentry {
    unsigned int                d_flags; // 表示支持哪些操作
    seqcount_t                  d_seq;
    struct hlist_bl_node        d_hash;
    struct dentry               *d_parent;
    struct qstr                 d_name; // 名字及hash值，
    struct inode                *d_inode; // 关联inode，NULL表示negative
    unsigned char               d_iname[DNAME_INLINE_LEN];
    struct lockref              d_lockref;
    const struct dentry_operations *d_op;
    struct super_block          *d_sb; // 指向超级块
    unsigned long               d_time; // used by d_revalidate
    void                        *d_fsdata; // fs-specific data
    struct list_head            d_lru;  // sb->s_dentry_lru
    union {
        struct list_head        d_child; // parent的子节点，应叫d_sibling
        struct rcu_head         d_rcu;
    } d_u;

    // 这个名字也不恰当，因为它不仅仅包含目录，还包含文件。
    struct list_head            d_subdirs; // 这才是真正的children
    struct hlist_node           d_alias; // inode->i_dentry
};
