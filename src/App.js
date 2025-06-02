import React, { useState, useEffect, useCallback } from 'react';
import { UserPlus, FileUp, Link, CheckCircle, AlertTriangle, XCircle, Power, PowerOff, Settings, UploadCloud, Info, LogIn, LogOut, ExternalLink } from 'lucide-react';

// Mock Web3 to simulate MetaMask connection if window.ethereum is not available
const mockEthereum = {
  request: async ({ method, params }) => {
    if (method === 'eth_requestAccounts') {
      console.log('Mock MetaMask: Requesting accounts...');
      // Simulate a delay and return a mock account
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAccounts = ['0xMockAccount1234567890abcdef'];
      console.log('Mock MetaMask: Accounts granted:', mockAccounts);
      return mockAccounts;
    }
    if (method === 'eth_chainId') {
      console.log('Mock MetaMask: Requesting chainId...');
      return '0x1'; // Mainnet
    }
    console.warn(`Mock MetaMask: Unhandled method ${method}`);
    return null;
  },
  on: (event, callback) => {
    console.log(`Mock MetaMask: Listener registered for event ${event}`);
  },
  removeListener: (event, callback) => {
    console.log(`Mock MetaMask: Listener removed for event ${event}`);
  },
  isMetaMask: true,
};

// Use mockEthereum if window.ethereum is not defined
const ethereum = typeof window !== 'undefined' && window.ethereum ? window.ethereum : mockEthereum;


// Component: UserRegistration
const UserRegistration = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [status, setStatus] = useState({ message: '', type: '' }); // type can be 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ message: '', type: '' }); // Clear previous status

    if (formData.senha !== formData.confirmarSenha) {
      setStatus({ message: 'As senhas não coincidem.', type: 'error' });
      return;
    }
    if (formData.senha.length < 6) {
      setStatus({ message: 'A senha deve ter pelo menos 6 caracteres.', type: 'error' });
      return;
    }
    // Simulate API call for registration
    console.log('Dados de registro:', formData);
    setStatus({ message: 'Cadastro realizado com sucesso! (Simulação)', type: 'success' });
    setFormData({ nomeCompleto: '', email: '', senha: '', confirmarSenha: '' }); // Clear form
  };

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white flex items-center justify-center">
        <UserPlus className="mr-3 h-8 w-8 text-blue-500" />
        Cadastro de Usuário
      </h2>
      
      {status.message && (
        <div className={`mb-4 p-3 rounded-md text-sm ${status.type === 'success' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100' : 'bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100'} flex items-center`}>
          {status.type === 'success' ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertTriangle className="h-5 w-5 mr-2" />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
          <input
            type="text"
            name="nomeCompleto"
            id="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="seuemail@exemplo.com"
          />
        </div>
        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <div>
          <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar Senha</label>
          <input
            type="password"
            name="confirmarSenha"
            id="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Repita sua senha"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-150"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

// Component: DocumentUpload
const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState({ message: '', type: '' }); // type can be 'success' or 'error' or 'info'
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setStatus({ message: '', type: '' });
    setUploadProgress(0);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setStatus({ message: 'Arquivo muito grande. Limite de 5MB.', type: 'error' });
        setSelectedFile(null);
        e.target.value = null; // Clear the input
        return;
      }
      setSelectedFile(file);
      setStatus({ message: `Arquivo selecionado: ${file.name}`, type: 'info' });
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatus({ message: 'Nenhum arquivo selecionado.', type: 'error' });
      return;
    }

    setStatus({ message: `Enviando ${selectedFile.name}...`, type: 'info' });
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
    
    // Simulate API call for upload
    console.log('Arquivo para upload:', selectedFile.name, selectedFile.size, selectedFile.type);
    setStatus({ message: `"${selectedFile.name}" enviado com sucesso! (Simulação)`, type: 'success' });
    setSelectedFile(null);
    setUploadProgress(100); 
    // Clear the file input visually (actual input clear is harder without form reset)
    document.getElementById('file-upload-input').value = null;
  };

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white flex items-center justify-center">
        <FileUp className="mr-3 h-8 w-8 text-green-500" />
        Envio de Documentação
      </h2>

      {status.message && (
        <div className={`mb-4 p-3 rounded-md text-sm ${
          status.type === 'success' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100' : 
          status.type === 'error' ? 'bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100' : 
          'bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100'
        } flex items-center`}>
          {status.type === 'success' ? <CheckCircle className="h-5 w-5 mr-2" /> : 
           status.type === 'error' ? <AlertTriangle className="h-5 w-5 mr-2" /> :
           <Info className="h-5 w-5 mr-2" />}
          {status.message}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="file-upload-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selecionar Arquivo (Max 5MB)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="file-upload-input"
                  className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800 focus-within:ring-blue-500"
                >
                  <span>Carregar um arquivo</span>
                  <input id="file-upload-input" name="file-upload-input" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.png" />
                </label>
                <p className="pl-1">ou arraste e solte</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC, DOCX, JPG, PNG até 5MB</p>
            </div>
          </div>
        </div>

        {selectedFile && uploadProgress > 0 && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        <div>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || (uploadProgress > 0 && uploadProgress < 100)}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 dark:focus:ring-offset-gray-800 transition-colors duration-150"
          >
            { (uploadProgress > 0 && uploadProgress < 100) ? `Enviando... ${uploadProgress}%` : 'Enviar Arquivo'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Component: MetaMaskConnect
const MetaMaskConnect = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const getChainName = (id) => {
    switch (id) {
      case '0x1': return 'Ethereum Mainnet';
      case '0x3': return 'Ropsten Testnet';
      case '0x4': return 'Rinkeby Testnet';
      case '0x5': return 'Goerli Testnet';
      case '0x2a': return 'Kovan Testnet';
      case '0xaa36a7': return 'Sepolia Testnet'; // 11155111 in decimal
      default: return `Unknown Chain (${id})`;
    }
  };

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      console.log('MetaMask: Please connect to MetaMask.');
      setAccount(null);
      setError('MetaMask desconectado. Por favor, conecte-se.');
    } else {
      setAccount(accounts[0]);
      setError('');
    }
  }, []);

  const handleChainChanged = useCallback(async (_chainId) => {
    console.log('MetaMask: Chain changed to', _chainId);
    setChainId(_chainId);
    // Optionally, reload or update UI based on chain
    // window.location.reload(); // Or a more graceful update
  }, []);

  useEffect(() => {
    if (ethereum && ethereum.isMetaMask) {
      // Check if already connected on load
      ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts && accounts.length > 0) {
            handleAccountsChanged(accounts);
          }
        })
        .catch(err => console.error("Error fetching initial accounts:", err));

      ethereum.request({ method: 'eth_chainId' })
        .then(setChainId)
        .catch(err => console.error("Error fetching chainId:", err));

      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);


  const connectWallet = async () => {
    setError('');
    setIsConnecting(true);
    if (ethereum && ethereum.isMetaMask) {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accounts);
        const currentChainId = await ethereum.request({ method: 'eth_chainId' });
        setChainId(currentChainId);
      } catch (err) {
        console.error("Erro ao conectar MetaMask:", err);
        if (err.code === 4001) {
          setError('Conexão com MetaMask rejeitada pelo usuário.');
        } else {
          setError(`Erro ao conectar: ${err.message}`);
        }
        setAccount(null);
      } finally {
        setIsConnecting(false);
      }
    } else {
      setError('MetaMask não detectado. Por favor, instale a extensão MetaMask.');
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setError('Carteira desconectada.');
    // Note: True disconnect from MetaMask itself is not programmatically possible for security reasons.
    // This just clears the state in the DApp.
  };

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg w-full max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center justify-center">
        <Link className="mr-3 h-8 w-8 text-orange-500" />
        Conectar MetaMask
      </h2>
      
      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100 flex items-center text-sm">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {account ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-700 rounded-lg border border-green-200 dark:border-green-600">
            <p className="text-green-700 dark:text-green-100 font-semibold text-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-500 dark:text-green-300" /> Conectado!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Endereço da Conta:</p>
            <p className="font-mono text-xs md:text-sm break-all text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 p-2 rounded">{account}</p>
            {chainId && (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Rede Conectada:</p>
                <p className="font-medium text-gray-800 dark:text-white">{getChainName(chainId)} ({chainId})</p>
              </>
            )}
          </div>
          <button
            onClick={disconnectWallet}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-150"
          >
            <LogOut className="mr-2 h-5 w-5" /> Desconectar
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 dark:focus:ring-offset-gray-800 transition-colors duration-150"
        >
          {isConnecting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Conectando...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-5 w-5" /> Conectar com MetaMask
            </>
          )}
        </button>
      )}
       <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        <p>Certifique-se de que a extensão MetaMask está instalada e ativa em seu navegador.</p>
        <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400 flex items-center justify-center mt-1">
          Baixar MetaMask <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

// Component: ChainlinkCheck
const ChainlinkCheck = () => {
  const [checkId, setCheckId] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' }); // type: 'success', 'error', 'info', 'loading'
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!checkId.trim()) {
      setStatus({ message: 'Por favor, insira um ID ou endereço para verificar.', type: 'error' });
      return;
    }
    
    setIsLoading(true);
    setStatus({ message: `Verificando registro para "${checkId}"...`, type: 'loading' });

    // Simulate API call to a Chainlink service/contract
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

    // Mock response based on input for demonstration
    if (checkId.toLowerCase() === 'registrado' || checkId.startsWith('0xRegistrado')) {
      setStatus({ message: `"${checkId}" está registrado na Chainlink. (Simulação)`, type: 'success' });
    } else if (checkId.toLowerCase() === 'pendente') {
      setStatus({ message: `Registro para "${checkId}" está pendente. (Simulação)`, type: 'info' });
    } else {
      setStatus({ message: `"${checkId}" não encontrado ou não registrado na Chainlink. (Simulação)`, type: 'error' });
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white flex items-center justify-center">
        <CheckCircle className="mr-3 h-8 w-8 text-sky-500" />
        Verificação Chainlink
      </h2>

      <div className="mb-4 p-3 rounded-md bg-yellow-50 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-100 text-sm flex items-start">
        <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          Esta é uma simulação. A integração real com a Chainlink requer configuração específica com contratos inteligentes e oráculos.
          <br/> Tente "registrado", "pendente" ou qualquer outro valor.
        </div>
      </div>

      {status.message && status.type !== 'loading' && (
        <div className={`mb-4 p-3 rounded-md text-sm ${
          status.type === 'success' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100' : 
          status.type === 'error' ? 'bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100' : 
          'bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100'
        } flex items-center`}>
          {status.type === 'success' ? <CheckCircle className="h-5 w-5 mr-2" /> : 
           status.type === 'error' ? <XCircle className="h-5 w-5 mr-2" /> :
           <Info className="h-5 w-5 mr-2" />}
          {status.message}
        </div>
      )}
      
      {status.type === 'loading' && (
         <div className="mb-4 p-3 rounded-md text-sm bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100 flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {status.message}
         </div>
      )}


      <form onSubmit={handleCheck} className="space-y-6">
        <div>
          <label htmlFor="checkId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID do Registro / Endereço do Contrato
          </label>
          <input
            type="text"
            name="checkId"
            id="checkId"
            value={checkId}
            onChange={(e) => setCheckId(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Ex: 0x123... ou ID do Job"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 dark:focus:ring-offset-gray-800 transition-colors duration-150"
          >
            {isLoading ? 'Verificando...' : 'Verificar Registro'}
          </button>
        </div>
      </form>
    </div>
  );
};


// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('cadastro'); // 'cadastro', 'documentos', 'metamask', 'chainlink'
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const NavLink = ({ page, children, icon: Icon }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
        ${currentPage === page 
          ? 'bg-blue-600 text-white dark:bg-blue-500' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        }
      `}
    >
      {Icon && <Icon className="mr-2 h-5 w-5" />}
      {children}
    </button>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'cadastro':
        return <UserRegistration />;
      case 'documentos':
        return <DocumentUpload />;
      case 'metamask':
        return <MetaMaskConnect />;
      case 'chainlink':
        return <ChainlinkCheck />;
      default:
        return <UserRegistration />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600 dark:text-blue-400">App Demo</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <NavLink page="cadastro" icon={UserPlus}>Cadastro</NavLink>
              <NavLink page="documentos" icon={FileUp}>Documentos</NavLink>
              <NavLink page="metamask" icon={Link}>MetaMask</NavLink>
              <NavLink page="chainlink" icon={CheckCircle}>Chainlink</NavLink>
            </div>
            <div className="flex items-center">
                 <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <PowerOff className="h-5 w-5" /> : <Power className="h-5 w-5" />}
                </button>
                 <div className="md:hidden ml-2"> {/* Hamburger Menu for Mobile */}
                    <select 
                        onChange={(e) => setCurrentPage(e.target.value)} 
                        value={currentPage}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="cadastro">Cadastro</option>
                        <option value="documentos">Documentos</option>
                        <option value="metamask">MetaMask</option>
                        <option value="chainlink">Chainlink</option>
                    </select>
                </div>
            </div>
          </div>
        </div>
         {/* Mobile Navigation Links - shown below header on small screens */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-wrap justify-around">
              <NavLink page="cadastro" icon={UserPlus}>Cadastro</NavLink>
              <NavLink page="documentos" icon={FileUp}>Docs</NavLink>
              <NavLink page="metamask" icon={Link}>MetaMask</NavLink>
              <NavLink page="chainlink" icon={CheckCircle}>Chainlink</NavLink>
            </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {renderPage()}
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Aplicação Exemplo. Todos os direitos reservados (simulação).
        </p>
      </footer>
    </div>
  );
}

export default App;
