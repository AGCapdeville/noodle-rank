import Fuse, { type FuseResult } from 'fuse.js';
import { useState, useEffect, type JSX } from 'react';
import styled from 'styled-components';
import noodleData from './data/noodle_products.json';

const options = {
    keys: ['Product Name', 'Brand'],
    threshold: 0.3,
    // Optimization: only index the fields you are searching to save memory
    findAllMatches: false,
};

const fuse = new Fuse(noodleData, options);

function searchRamen(query: string): 
    FuseResult<{
        "Product Name": string;
        Brand: string;
        Style: string;
    }>[] {

    if (!query) return [];

    // Fuse handles the large array in milliseconds   
    let fr = fuse.search(query, { limit: 10 });
    fr.slice(0,10);

    console.log(fr);

    return fr;
} 

const SearchBarSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;
`;

const SearchBar = styled.input`
    width: 70%;
    height: 30px;
    color: black;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;

    font-size: large;

    input {
        width: 90%;
        padding: 0.5rem;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
    }
`;

const SearchResults = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  position: relative;
`;

interface SearchDropdown {
    $isVisible: boolean;
}

const SearchDropdown = styled.div<SearchDropdown>`
    display: ${props => (props.$isVisible ? 'flex' : 'none')};

    top: 1px;
    width: 70%;
    height: 30vh;
    
    background-color: black;
    align-items: center;
    justify-content: left;
    flex-direction: column;
    position: absolute;
`;

const SearchItem = styled.div`
    width: 100%;
    height: 50px;
    background-color: white;
    align-items: center;
    justify-content: center;
    display: flex;
    &:hover {
        background-color: lightblue;
    }
`;

export default function RamenSearch() {
    
    const [query, setQuery] = useState(""); // Tracks the input box
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Tracks the "delayed" version
    const [results, setResults] = useState<FuseResult<{ "Product Name": string; Brand: string; Style: string; }>[]>([]); // Tracks the search results    

    const [isVisible, setIsVisible] = useState(false);

    // 1. This effect handles the timer logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            if (results.length > 0) {
                setIsVisible(true);
            }
        }, 100);

        if (query.length == 0) {
            setResults([])
        }

        // 2. This is the cleanup function. It kills the timer if the user types again 
        // before the 300ms is up.
        return () => clearTimeout(timer);
    }, [query]);

    // 3. This effect only runs when the "delayed" query changes
    useEffect(() => {
        if (debouncedQuery) {
            // console.log("Searching for:", debouncedQuery);
            // Run your Fuse.js search here!
            let t = searchRamen(debouncedQuery);
            // console.log(t);
            setResults(t);
        }
    }, [debouncedQuery]);

    return (
        <SearchBarSection>

            <SearchBar
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => setResults([])}
                placeholder="Search ramen..."
            />
            
            <SearchResults>
                {/* Render search results here */}
                
                <SearchDropdown $isVisible={isVisible}>
                    {results.map((r) => (
                        <SearchItem>
                            {r.item.Brand + " | " + r.item['Product Name'] + " | " + r.item.Style}
                        </SearchItem>
                    ))}
                </SearchDropdown>

            </SearchResults>
        </SearchBarSection>
    );
}