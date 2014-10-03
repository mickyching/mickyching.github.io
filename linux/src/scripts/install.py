#!/usr/bin/env python
# -*- coding:utf-8 -*-

from bin_simops import *

ins_directory = "~/bin"
ins_files = """
bin_simops.py:bin_simops.py
puborg.py:puborg
del.py:del
"""

parser.add_argument("ins", nargs="+",
                    help = "can be installed: bin, env, shrc, gitrc")
parser.add_argument("-u", "--uninstall", action = "store_true",
                    help = "can be uninstall: bin")
ins_list = parser.parse_args().ins
ins_uninstall = parser.parse_args().uninstall

def do_uninstall(ins, ins_dir):
    if ins == "bin":
        for line in ins_files.strip().split("\n"):
            src, dst = line.split(":")
            send_cmd("rm -f %s/%s" %(ins_dir, dst))
            if dst[-3:] == ".py":
                send_cmd("rm -f %s/%sc" %(ins_dir, dst))

def do_install(ins, ins_dir):
    if ins == "bin":
        for line in ins_files.strip().split("\n"):
            src, dst = line.split(":")
            send_cmd("cp -a %s %s/%s" %(src, ins_dir, dst))

    if ins == "env":
        env_val = "\n"
        env_val += "export PYTHONPATH=$PYTHONPATH:" + ins_dir + "\n"
        env_val += "export PATH=$PATH:" + ins_dir + "\n"
        send_cmd("cp ~/.bashrc ~/.bashrc.old")
        send_cmd("echo '%s' >> ~/.bashrc" %(env_val))

    if ins == "shrc":
        send_cmd("cp ~/.bashrc ~/.bashrc.old")
        send_cmd("cp cfg/bashrc.cfg ~/.bashrc")

    if ins == "gitrc":
        send_cmd("cp ~/.gitconfig ~/.gitconfig.old")
        send_cmd("cp cfg/gitconfig.cfg ~/.gitconfig")

if __name__ == "__main__":
    ins_dir = os.path.expanduser(ins_directory)

    for ins in ins_list:
        if ins_uninstall:
            do_uninstall(ins, ins_dir)
        else:
            do_install(ins, ins_dir)
