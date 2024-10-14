import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

const CookWithUs = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the Gemini API key from the app.json file
  const geminiApiKey = Constants.manifest.extra.geminiApiKey;

  // Function to fetch AI-generated recipes
  const fetchRecipes = async () => {
    if (!geminiApiKey) {
      setError('API key is missing!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://api.gemini.com/recipes', {
        headers: {
          'Authorization': `Bearer ${geminiApiKey}`,
        },
      });
      setRecipes(response.data.recipes);
    } catch (err) {
      setError('Error fetching AI-generated recipe');
      console.error("Error fetching AI-generated recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  // Use Effect to load recipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeDetails}>Ingredients: {item.ingredients.join(', ')}</Text>
      <Text style={styles.recipeDetails}>Steps: {item.steps.join(', ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>Cook With Us - AI Generated Recipes</Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyList}>No recipes found.</Text>}
      />

      <Button title="Fetch Recipes" onPress={fetchRecipes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDetails: {
    fontSize: 14,
    color: '#555',
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  emptyList: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default CookWithUs;
