import axios from "axios";

const TRANSACTION_API_BASE_URL = "https://13.214.189.72/api/v1/transactions";

class TransactionService {
  saveTransaction(Transaction) {
    return axios.post(TRANSACTION_API_BASE_URL, Transaction);
  }

  getTransactions() {
    return axios.get(TRANSACTION_API_BASE_URL);
  }

  getTransactionById(id) {
    return axios.get(TRANSACTION_API_BASE_URL + "/" + id);
  }

  updateTransaction(Transaction) {
    return axios.patch(TRANSACTION_API_BASE_URL, Transaction);
  }
}

export default new TransactionService();
