.PHONY: test

all: init test

init:
	npm install

test:
	./node_modules/mocha/bin/mocha \
		--recursive \
		--reporter nyan

coverage:
	jscoverage --no-highlight lib lib-cov
	@HTML_COVERAGE=1 ./node_modules/mocha/bin/mocha \
		--recursive \
		--reporter html-cov > coverage.html
	rm -rf lib-cov

dev:
	node bin/seshun