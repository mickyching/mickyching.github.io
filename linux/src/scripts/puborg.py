#!/usr/bin/env python
# -*- coding:utf-8 -*-

from bin_simops import *

org_elisp = "~/.emacs.d/lisp/mc-org.el"
org_posts = "~/.org-pages/_posts"


def cleanup_cache():
    send_cmd("rm -rf ~/.org-timestamps/*.cache")


def cleanup_directory(dirname):
    if not dirname:
        pr_line("no directory found\n")
        return

    send_cmd("rm -rf %s/*.html %s/*.pdf %s/*.tex %s/*.tex~ %s/*.html~"
             % (dirname, dirname, dirname, dirname, dirname))


def pages_fix_posts(posts, category):
    dirname = os.path.expanduser(os.path.normpath(posts))
    if category:
        dirname = os.path.normpath(dirname + "/" + category)

    files = os.listdir(dirname)
    for fname in files:
        if fname[-5:] != ".html":
            continue
        fname = dirname + "/" + fname
        lines = []
        if category:
            lines.append("---\n")
            lines.append("categories: %s\n" %(category))
            lines.append("---\n")

        f = open(fname, "r")
        for line in f:
            line = line_replace(line, 'src="fig/', 'src="/source/fig/')
            line = line_replace(line, 'href="src/', 'href="/source/src/')
            lines.append(line)
        f.close()

        f = open(fname, 'w')
        for line in lines:
            f.write(line)
        f.close()


def publish_directory(cmd_list, dirname):
    if not dirname:
        return

    cleanup_cache()

    cwd = os.getcwd()
    cmd_line = "emacs -batch -l %s -f " %(org_elisp)
    dirname = os.path.normpath(dirname)
    category = dirname

    pr_lline("-------------------- publish %s/%s --------------------"
             %(cwd, dirname))
    os.chdir(dirname)
    for cmd in cmd_list:
        send_cmd("mkdir -p %s/fig %s/src" %(dirname, dirname))
        send_cmd(cmd_line + cmd)
        if cmd == "publish-pages":
            send_cmd("mv %s/*.html %s/%s/" %(org_posts, org_posts, category))
            pages_fix_posts(org_posts, category)
    os.chdir(cwd)


def publish_org(cmd_list, dir_list, need_clean):
    for dname in dir_list:
        dname = os.path.normpath(dname)
        if need_clean:
            cleanup_directory(dname)
        else:
            publish_directory(cmd_list, dname)


parser.add_argument("dirs", nargs = "+",
                    help = "directories to publish")
parser.add_argument("-i", "--index", action = "store_true",
                    help = "publish html index")
parser.add_argument("-p", "--page", action = "store_true",
                    help = "publish html document")
parser.add_argument("-j", "--jekyll", action = "store_true",
                    help = "publish jekyll pages")
parser.add_argument("-d", "--doc", action = "store_true",
                    help = "publish pdf document")
parser.add_argument("-s", "--slide", action = "store_true",
                    help = "publish pdf slide")
parser.add_argument("-c", "--clean", action = "store_true",
                    help = "cleanup files")
parser.add_argument("-S", "--serve",
                    help = "start http service at specified port")
parser.add_argument("-J", "--jserve", action = "store_true",
                    help = "start jekyll serve")

dir_list = parser.parse_args().dirs

cmd_list = []
if parser.parse_args().index: cmd_list.append("publish-html-index")
if parser.parse_args().page: cmd_list.append("publish-html")
if parser.parse_args().jekyll: cmd_list.append("publish-pages")
if parser.parse_args().doc: cmd_list.append("publish-doc")
if parser.parse_args().slide: cmd_list.append("publish-slide")

need_clean = parser.parse_args().clean
http_port = parser.parse_args().serve
jekyll_serve = parser.parse_args().jserve

if __name__ == "__main__":
    if http_port:
        send_cmd("python -m SimpleHTTPServer %s" % http_port)
    elif jekyll_serve:
        send_cmd("jekyll serve")
    else:
        publish_org(cmd_list, dir_list, need_clean)
