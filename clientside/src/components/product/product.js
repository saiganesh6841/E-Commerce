import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Items from '../card/items';
import styles from './product.module.css';
import { searchQueryContext } from '../../navigationStack/navigation';
import { baseURL } from '../../App';



const Products = () => {

    const {searchQuery}=useContext(searchQueryContext)
    // console.log(searchQuery)
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post(`${baseURL}/getProducts`);
                setProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                return;
            }

            try {
                const response = await axios.get(`${baseURL}/getProductsByCategory?category=${searchQuery}`);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);
    

    const renderItems = () => {
        if (searchQuery.trim() !== '' && searchResults.length > 0) {
            return (
                <div className={styles.grid}>
                    {searchResults.map((product, index) => (
                        <Items key={index} data={product} />
                    ))}
                </div>
            );
        } else if (searchQuery.trim() !== '' && searchResults.length === 0) {
            return (
                <p>No products found.</p>
            );
        } else {
            return (
                <div className={styles.grid}>
                    {products.map((product, index) => (
                        <Items key={index} data={product} />
                    ))}
                </div>
            );
        }
    };


    return (
        <div className={styles.productsContainer}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                renderItems()
            )}
        </div>
    );
};

export default Products;
