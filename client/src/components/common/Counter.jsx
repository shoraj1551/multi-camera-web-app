import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div style={styles.container}>
            <h1>Counter</h1>
            <p style={styles.count}>{count}</p>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={increment}>
                    Increment
                </button>
                <button style={styles.button} onClick={decrement}>
                    Decrement
                </button>
                <button style={styles.button} onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    count: {
        fontSize: '2rem',
        margin: '20px 0',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: '#fff',
    },
};

export default Counter;