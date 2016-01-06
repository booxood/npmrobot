TESTS = $(shell find test -type f -name "*.js")
REPORTER = spec
TIMEOUT = 20000
MOCHA_OPTS =

install:
	@npm install

test: install
	@NODE_ENV=test ./node_modules/mocha/bin/mocha --harmony \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@NODE_ENV=test node --harmony-generators \
		./node_modules/.bin/istanbul cover \
		./node_modules/mocha/bin/_mocha \
		-- -u exports \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-all: test test-cov

.PHONY: test test-cov test-all
