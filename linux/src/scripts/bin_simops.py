#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import sys
import string
import argparse

config_debug_level = 2

parser = argparse.ArgumentParser()

def pr_line(msg):
    if config_debug_level > 0:
        print(msg)

def pr_lline(msg):
    if config_debug_level > 1:
        print(msg)

def pr_llline(msg):
    if config_debug_level > 2:
        print(msg)

def send_cmd(cmd):
    pr_lline(cmd)
    os.system(cmd)

def line_replace(line, old, new):
    if old in line and not new in line:
        line = string.replace(line, old, new)
        if len(line) > 80:
            pr_lline(line[:80])
        else:
            pr_lline(line[:-1])

    return line
