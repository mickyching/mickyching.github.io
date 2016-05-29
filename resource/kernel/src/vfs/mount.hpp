struct mount {
    struct hlist_node           mnt_hash; // mount_hashtable[i]
                                          // mount_lock
    struct mount                *mnt_parent;
    struct dentry               *mnt_mountpoint; // 即mnt->mnt_root。
    struct vfsmount             mnt;
    struct rcu_head             mnt_rcu;
#ifdef CONFIG_SMP
    struct mnt_pcp __percpu     *mnt_pcp;
#else
    int                         mnt_count;
    int                         mnt_writers;
#endif

    struct list_head mnt_mounts;    // mount->mnt_child
    struct list_head mnt_child;     // mount->mnt_mounts
    struct list_head mnt_instance;  // sb->s_mounts
    const char *mnt_devname;        // device name: "/dev/dsk/hda1"
    struct list_head mnt_list;      // mnt_namespace->list
    struct list_head mnt_expire;    // link in fs-specific expiry list
    struct list_head mnt_share;     // circular list of shared mounts
    struct list_head mnt_slave_list;// list of slave mounts
    struct list_head mnt_slave;     // slave list entry
    struct mount *mnt_master;       // slave is on master->mnt_slave_list
    struct mnt_namespace *mnt_ns;   // containing namespace
    struct mountpoint *mnt_mp;      // where is it mounted

    int mnt_id;                     // mount identifier
    int mnt_group_id;               // peer group identifier
    int mnt_expiry_mark;
    int mnt_pinned;
    struct path mnt_ex_mountpoint;
};

struct vfsmount {
    struct dentry *mnt_root;        // 挂载目录项
    struct super_block *mnt_sb;     // 指向super_block
    int mnt_flags;
};

struct mountpoint {
    struct hlist_node m_hash;       // mountpoint_hashtable
    struct dentry *m_dentry;
    int m_count;
};
