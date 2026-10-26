import ProductList from './components/ProductList'
import Header from './components/Header' 


const App = () => {
 

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-600">
        🛒 Product Catalog 
      </h1>

      <ProductList />
    </div>
    </>
  );
};

export default App
