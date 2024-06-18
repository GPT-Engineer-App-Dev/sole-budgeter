import { useState } from "react";
import { Container, VStack, HStack, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "Income", category: "Nike" },
    { id: 2, date: "2023-10-02", amount: 150, type: "Expense", category: "Adidas" },
  ]);

  const [newTransaction, setNewTransaction] = useState({ date: "", amount: "", type: "", category: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    if (isEditing) {
      setTransactions(transactions.map((transaction) => (transaction.id === currentId ? { ...newTransaction, id: currentId } : transaction)));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    }
    setNewTransaction({ date: "", amount: "", type: "", category: "" });
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find((transaction) => transaction.id === id);
    setNewTransaction(transaction);
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sneaker Accounting App</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Date" name="date" value={newTransaction.date} onChange={handleChange} />
          <Input placeholder="Amount" name="amount" value={newTransaction.amount} onChange={handleChange} />
          <Select placeholder="Type" name="type" value={newTransaction.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Select>
          <Select placeholder="Category" name="category" value={newTransaction.category} onChange={handleChange}>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </Select>
          <Button onClick={handleAddTransaction}>{isEditing ? "Update" : "Add"}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditTransaction(transaction.id)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteTransaction(transaction.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;