#!/usr/bin/env python
# -*- coding:utf-8 -*-

import time
from bin_simops import *

trash_path = "~/.del_trash"

def current_directory_name(root):
    subdir = time.strftime("%Y/%m/%d%H%M", time.localtime(time.time()))
    return "%s/%s" %(root, subdir)

def current_directory_create(root):
    dname = current_directory_name(root)
    send_cmd("mkdir -p %s" %(dname))
    return dname

def delete_file(fname, trash):
    send_cmd("mv %s %s" %(fname, trash))

parser.add_argument("files", nargs="+", help="files to delete")
files_list = parser.parse_args().files

if __name__ == "__main__":
    trash = current_directory_create(trash_path)
    files = " ".join(files_list)
    delete_file(files, trash)
