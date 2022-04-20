const toggleActiveClass = (className: string, predicate: boolean) => className + (predicate
    ? ' active'
    : '');

export default toggleActiveClass;