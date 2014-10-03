#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os

dir_list = """
programming slides linux kernel
"""

head_lines = """
#+TITLE: org pages
#+AUTHOR: Micky Ching
#+OPTIONS: H:4 ^:nil toc:nil
#+LATEX_CLASS: latex-doc

*文章列表*
"""

def gen_org_index(dir_list, lines, index_file = "index.org"):
    html_files = []
    for dname in dir_list.strip().split(" "):
        [html_files.append((fname, dname)) for fname in os.listdir(dname) if fname[-5:] == ".html"]
    html_files.sort(reverse = True)

    for html in html_files:
        url = "file:%s/%s" %(html[1], html[0])
        name = html[0][:10] + " " + " ".join(html[0][11:-5].split("-"))
        lines.append("- [[%s][%s]]\n" %(url, name))

    f = open(index_file, "w")
    [f.write(line) for line in lines]
    f.close()

if __name__ == "__main__":
    lines = []
    lines.append(head_lines)
    gen_org_index(dir_list, lines)
    os.system("puborg -i .")
