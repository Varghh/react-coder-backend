import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount';

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  
  const { addItem } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    
    const item = {
      id,
      name,
      price,
      img
    };
    
    addItem(item, quantity);
  };

  return (
    <article style={styles.container}>
      <div style={styles.imageContainer}>
        <img 
          src={img} 
          alt={name}
          style={styles.img}
        />
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>{name}</h2>
        <p style={styles.category}>Categoría: {category}</p>
        <p style={styles.description}>{description}</p>
        <p style={styles.price}>${price.toLocaleString()}</p>
        <p style={styles.stock}>Stock disponible: {stock}</p>
        
        {
          quantityAdded > 0 ? (
            <div style={styles.addedContainer}>
              <p style={styles.addedText}>
                ✓ Agregaste {quantityAdded} unidad(es) al carrito
              </p>
              <Link 
                to='/cart' 
                style={styles.cartLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(78, 205, 196, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(78, 205, 196, 0.3)';
                }}
              >
                Ir al carrito
              </Link>
              <Link 
                to='/' 
                style={styles.continueLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                }}
              >
                Seguir comprando
              </Link>
            </div>
          ) : (
            <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
          )
        }
      </div>
    </article>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '3rem',
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '2.5rem',
    backgroundColor: '#2d2d44',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
  },
  imageContainer: {
    flex: 1,
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0'
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    color: '#e0e0e0',
    fontWeight: '700'
  },
  category: {
    color: '#b0b0b0',
    textTransform: 'capitalize',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  description: {
    marginBottom: '1.5rem',
    lineHeight: 1.8,
    color: '#e0e0e0',
    fontSize: '1.05rem'
  },
  price: {
    fontSize: '2.2rem',
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  stock: {
    color: '#b0b0b0',
    marginBottom: '2rem',
    fontSize: '1rem'
  },
  addedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  addedText: {
    color: '#20BF6B',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  cartLink: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #4ECDC4 0%, #20BF6B 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'
  },
  continueLink: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
  }
};

export default ItemDetail;