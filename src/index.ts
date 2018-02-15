const delimiter = ' ';
const whitespaceRegEx = new RegExp('\\s');

/**
 * Remove all extra whitespace, including in the middle of the string.
 * @param str
 */
function trimString
(
  str : string
) : string
{
  if (whitespaceRegEx.test(str)) {
    return str
    .replace(whitespaceRegEx, delimiter)
    .split(delimiter)
    .filter(isNonEmptyString)
    .join(delimiter);
  }

  return str;
}

/**
 * Returns false if the string is empty  or contains only white spaces.
 * @param str
 */
function isNonEmptyString
(
  str : string
) : boolean
{
  const isEmpty = trimString(str).length == 0;
  return !isEmpty;
}

/**
 * Return value is trimmed.
 * @param value
 */
function getClassNameFromSingleValue
(
  value : any
) : string
{
  // For `undefined`, null, false, 0, ''.
  if (!value) {
    return '';
  }

  // Ignore meaningless value `true`.
  if (value == true) {
    return '';
  }

  if (Array.isArray(value)) {
    // For `[]`.
    if (value.length == 0) {
      return '';
    }

    const values : Array<string> = value
    .map(getClassNameFromSingleValue)
    .filter(isNonEmptyString);

    return trimString(values.join(delimiter));
  }

  const type : string = typeof value;

  // Numbers are not valid class names.
  if (type == 'number') {
    return '';
  }

  if (type == 'function') {
    return getClassNameFromSingleValue(value());
  }

  if (type == 'object') {
    // If object has string form, use it.
    if ('toString' in value && value.toString != Object.prototype.toString) {
      // Don't trust the return value of `value.toString()`.
      const potentialStringValue : any = value.toString();

      return getClassNameFromSingleValue(potentialStringValue);
    }

    // Otherwise collect property names that have truthy value.
    const propNames = Object.keys(value);

    const truthyPropNames = propNames
    .filter((propName) => {
      let propValue : any = value[propName];
      const propValueType : string = typeof propValue;

      if (propValueType == 'function') {
        propValue = propValue();
      }

      return Boolean(propValue);
    })
    .filter(isNonEmptyString);

    return truthyPropNames.join(delimiter).trim();
  }

  // For all else, return its trimmed string form.
  return trimString(String(value));
}

function classNames
(
  ...items : Array<any>
) : string {
  return getClassNameFromSingleValue(items);
}

export default classNames;
