.PHONY: all pages latex clean

puborg = ~/.emacs.d/micky/puborg/puborg
pages_dir = $(realpath ..)

posts = menu

web:
	@mkdir -p build
	@ln -sfn $(pages_dir) build/pages
	$(puborg) -p $(posts)
	@rm build/pages

pdf:
	$(puborg) -l $(posts)

all: web pdf

clean:
	$(puborg) --clean
