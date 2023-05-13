// Generic Class
class ValueHolder<T> {   // T = Type for value property
    value: T;
}

const numberHolder = new ValueHolder<number>();


// Generic function
const valueWrapper = <T>(value: T): T[] => {
    return [value];
};

valueWrapper<number>(10);

// Type Inference works here
valueWrapper(10);

const value = valueWrapper(10);