import { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <button 
          style={{
            ...styles.button,
            ...(quantity <= 1 ? styles.buttonDisabled : {})
          }}
          onClick={decrement}
          disabled={quantity <= 1}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          -
        </button>
        <h4 style={styles.quantity}>{quantity}</h4>
        <button 
          style={{
            ...styles.button,
            ...(quantity >= stock ? styles.buttonDisabled : {})
          }}
          onClick={increment}
          disabled={quantity >= stock}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          +
        </button>
      </div>
      <div>
        <button 
          style={{
            ...styles.addButton,
            ...(stock <= 0 ? styles.addButtonDisabled : {})
          }}
          onClick={() => onAdd(quantity)}
          disabled={stock <= 0}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(78, 205, 196, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(78, 205, 196, 0.3)';
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center',
    margin: '1rem 0'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '0.5rem',
    backgroundColor: '#3d3d54',
    borderRadius: '12px'
  },
  button: {
    width: '45px',
    height: '45px',
    fontSize: '1.5rem',
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    lineHeight: 1
  },
  quantity: {
    margin: 0,
    fontSize: '1.8rem',
    minWidth: '50px',
    textAlign: 'center',
    color: '#e0e0e0',
    fontWeight: '600'
  },
  addButton: {
    padding: '1rem 2.5rem',
    background: 'linear-gradient(135deg, #4ECDC4 0%, #20BF6B 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  addButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: 'linear-gradient(135deg, #4d4d64 0%, #3d3d54 100%)'
  }
};

export default ItemCount;