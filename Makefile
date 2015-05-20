default: build

build: clean src/sbm.js

install: build
	- npm rm -g sbm
	- npm i -g .

clean:
	- rm src/*.js

src/sbm.js:
	- tsc --module commonjs src/sbm.ts

