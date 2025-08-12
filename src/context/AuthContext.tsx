
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: "bpc" | "withdrawal" | "deposit";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  description: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  hasPurchasedBPC: boolean;
}

interface AuthContextType {
  user: User | null;
  balance: number;
  isAuthenticated: boolean;
  transactions: Transaction[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  purchaseBPC: () => void;
  withdraw: (amount: number) => boolean;
}

const defaultContext: AuthContextType = {
  user: null,
  balance: 0,
  isAuthenticated: false,
  transactions: [],
  login: async () => false,
  register: async () => false,
  logout: () => {},
  purchaseBPC: () => {},
  withdraw: () => false,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(500000); // Updated initial balance to ₦500,000
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Check for existing user session
  useEffect(() => {
    const storedUser = localStorage.getItem('bluepay_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Retrieve balance from localStorage
        const storedBalance = localStorage.getItem(`bluepay_balance_${parsedUser.id}`);
        if (storedBalance) {
          setBalance(Number(storedBalance));
        }
        
        // Retrieve transactions
        const storedTransactions = localStorage.getItem(`bluepay_transactions_${parsedUser.id}`);
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('bluepay_user');
      }
    }
  }, []);

  // Save transactions to localStorage
  const saveTransactions = (userId: string, updatedTransactions: Transaction[]) => {
    setTransactions(updatedTransactions);
    localStorage.setItem(`bluepay_transactions_${userId}`, JSON.stringify(updatedTransactions));
  };

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    if (!user) return;
    
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    const updatedTransactions = [newTransaction, ...transactions];
    saveTransactions(user.id, updatedTransactions);
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      // Check if user already exists
      const existingUsers = localStorage.getItem('bluepay_users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      const userExists = users.some((u: any) => u.email === email);
      if (userExists) {
        toast.error('User with this email already exists');
        return false;
      }
      
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // In a real app, this would be hashed
        hasPurchasedBPC: false
      };
      
      // Save user to "database"
      users.push(newUser);
      localStorage.setItem('bluepay_users', JSON.stringify(users));
      
      // Save user session
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('bluepay_user', JSON.stringify(userWithoutPassword));
      
      // Initialize user balance
      localStorage.setItem(`bluepay_balance_${newUser.id}`, balance.toString());
      
      // Initialize welcome transaction
      const initialTransaction: Transaction = {
        id: Date.now().toString(),
        type: "deposit",
        amount: 500000, // Updated welcome bonus to ₦500,000
        date: new Date().toISOString(),
        status: "completed",
        description: "Welcome Bonus"
      };
      saveTransactions(newUser.id, [initialTransaction]);
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      toast.error('Registration failed');
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      const existingUsers = localStorage.getItem('bluepay_users');
      if (!existingUsers) {
        toast.error('Invalid credentials');
        return false;
      }
      
      const users = JSON.parse(existingUsers);
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        toast.error('Invalid credentials');
        return false;
      }
      
      // Save user session
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('bluepay_user', JSON.stringify(userWithoutPassword));
      
      // Set user balance
      const storedBalance = localStorage.getItem(`bluepay_balance_${foundUser.id}`);
      if (storedBalance) {
        setBalance(Number(storedBalance));
      } else {
        localStorage.setItem(`bluepay_balance_${foundUser.id}`, balance.toString());
      }
      
      // Get user transactions
      const storedTransactions = localStorage.getItem(`bluepay_transactions_${foundUser.id}`);
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      } else {
        // Initialize with a welcome transaction if this is first login
        const initialTransaction: Transaction = {
          id: Date.now().toString(),
          type: "deposit",
          amount: 500000, // Updated welcome bonus to ₦500,000
          date: new Date().toISOString(),
          status: "completed",
          description: "Welcome Bonus"
        };
        saveTransactions(foundUser.id, [initialTransaction]);
      }
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setTransactions([]);
    localStorage.removeItem('bluepay_user');
    toast.success('Logged out successfully');
  };

  const purchaseBPC = () => {
    if (!user) return;
    
    // Check if user has enough balance
    if (balance < 8000) {
      toast.error('Insufficient balance to purchase BPC code');
      return;
    }
    
    // Update balance
    const newBalance = balance - 8000;
    setBalance(newBalance);
    localStorage.setItem(`bluepay_balance_${user.id}`, newBalance.toString());
    
    // Update user's BPC status
    const updatedUser = { ...user, hasPurchasedBPC: true };
    setUser(updatedUser);
    localStorage.setItem('bluepay_user', JSON.stringify(updatedUser));
    
    // Update in users list
    const existingUsers = localStorage.getItem('bluepay_users');
    if (existingUsers) {
      const users = JSON.parse(existingUsers);
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, hasPurchasedBPC: true } : u
      );
      localStorage.setItem('bluepay_users', JSON.stringify(updatedUsers));
    }
    
    // Add transaction
    addTransaction({
      type: "bpc",
      amount: 8000,
      status: "completed",
      description: "BPC Code Purchase"
    });
    
    toast.success('BPC code purchased successfully!');
  };

  const withdraw = (amount: number): boolean => {
    if (!user) return false;
    
    // Check if user has purchased BPC
    if (!user.hasPurchasedBPC) {
      toast.error('You need to purchase a BPC code before you can withdraw');
      return false;
    }
    
    // Check if withdrawal amount is valid
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return false;
    }
    
    // Check if user has enough balance
    if (balance < amount) {
      toast.error('Insufficient balance');
      return false;
    }
    
    // Process withdrawal
    const newBalance = balance - amount;
    setBalance(newBalance);
    localStorage.setItem(`bluepay_balance_${user.id}`, newBalance.toString());
    
    // Add transaction
    addTransaction({
      type: "withdrawal",
      amount: amount,
      status: "pending",
      description: "Withdrawal to Bank"
    });
    
    toast.success(`Successfully submitted withdrawal request for ₦${amount.toLocaleString()}`);
    return true;
  };

  const contextValue = {
    user,
    balance,
    isAuthenticated,
    transactions,
    login,
    register,
    logout,
    purchaseBPC,
    withdraw,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
