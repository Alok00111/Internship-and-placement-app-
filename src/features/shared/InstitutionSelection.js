import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';

const UNIVERSITIES = [
  { id: '1', name: 'Christ University', location: 'Bangalore' },
  { id: '2', name: 'Jain University', location: 'Bangalore' },
  { id: '3', name: 'MIT', location: 'Manipal' },
];

const InstitutionSelection = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const handleSelect = (uni) => {
    // Save this selection globally and move to Login
    navigation.navigate('Login', { universityId: uni.id, universityName: uni.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Institution</Text>
      <TextInput 
        style={styles.searchBar}
        placeholder="Search University..."
        onChangeText={setSearch}
      />
      <FlatList
        data={UNIVERSITIES.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemLoc}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  searchBar: { backgroundColor: '#f1f5f9', padding: 15, borderRadius: 10, marginBottom: 20 },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  itemName: { fontSize: 18, fontWeight: '600' },
  itemLoc: { color: '#64748b' }
});

export default InstitutionSelection;