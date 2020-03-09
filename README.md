# @xch/class-names

[![Build Status](https://travis-ci.com/Zodiase/class-names.svg?branch=master)](https://travis-ci.com/Zodiase/class-names)
[![Known Vulnerabilities](https://snyk.io/test/github/Zodiase/class-names/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Zodiase/class-names?targetFile=package.json)

Utility function for building className strings.

## Install

```Bash
npm install --save @xch/class-names
```

## Usage

```JavaScript
import classNames from '@xch/class-names';

classNames('name1', 'name2'); // => 'name1 name2'

const someOptionalClassName = getOptionalClassName(); // Assume this returns `null` or `false`.
// Falsy inputs are ignored.
classNames('name1', someOptionalClassName, 'name2'); // => 'name1 name2'
// Also supports arrays.
classNames([ 'name1', someOptionalClassName, 'name2' ]); // => 'name1 name2'

// Object's own property names will be collected when their values are truthy.
const dynamicClassNames = {
    foo: true,
    bar: false,
    // If property value is a function, its return value will be used.
    baz: () => false,
    qux: () => true,
    // There is no nesting.
    quux: {
        foo: true,
    },
};
classNames(dynamicClassNames); // => 'foo qux quux'

// Boolean values and numbers are ignored since they are meaningless.
classNames('name1', 123, true, 'name2'); // => 'name1 name2'
```

## Usage in React

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from '@xch/class-names';

const Component = (props) => {
    return (
        <div
            className={classNames(
                'module-name',
                {
                    'module-name--disabled': props.disabled,
                    'module-name--highlighted': props.highlighted,
                },
            )}
        >{props.children}</div>
    );
};

ReactDOM.render(<Component disabled />, 'root'); // Element.className => 'module-name module-name--disabled'
```

## License

MIT
