#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os

dir_list = """
tools programming slides linux kernel network buddhism
"""

head_lines = """
#+TITLE: org pages
#+AUTHOR: Micky Ching
#+OPTIONS: H:4 ^:nil toc:t
#+LATEX_CLASS: latex-doc

"""

def gen_org_index(dir_list, lines, index_file = "index.org"):
    cat_files = []
    for dname in dir_list.strip().split(" "):
        files = []
        [files.append(fname) for fname in os.listdir(dname) if fname[-5:] == ".html"]
        cat_files.append([dname, files])

    for cat in cat_files:
        lines.append("* %s (%d)\n" %(cat[0], len(cat[1])))
        cat[1].sort(reverse = True)
        for fname in cat[1]:
            url = "file:%s/%s" %(cat[0], fname)
            name = fname[:10] + " " + " ".join(fname[11:-5].split("-"))
            lines.append("- [[%s][%s]]\n" %(url, name))

    f = open(index_file, "w")
    [f.write(line) for line in lines]
    f.close()

if __name__ == "__main__":
    lines = []
    lines.append(head_lines)
    gen_org_index(dir_list, lines)
    os.system("puborg -i .")
