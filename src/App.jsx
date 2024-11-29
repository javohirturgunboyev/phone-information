import React, { useEffect, useState } from 'react';
import { backend } from './axios';
import Card from './components/Card';
import { SyncLoader } from 'react-spinners';

const App = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    backend.get('products/all')
      .then((response) => {
        if (response.status === 200) {
          setPhones(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const validate = () => {
    if (!name) {
      alert('Iltimos telefondi nomini kiriting!!');
      return false;
    }
    if (!price) {
      alert('Iltimos telefondi narxini kiriting!!');
      return false;
    }
    if (!description) {
      alert('Iltimos telefonga izoh qoldiring!!');
      return false;
    }
    return true;
  };

  const handleSend = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    const phone = {
      name,
      price,
      description,
      status: 'active',
      category_id: 2,
    };

    backend.post('products/', phone, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setPhones((prevPhones) => [...prevPhones, response.data]);
        }
      })
      .catch((error) => {
        setError('Something went wrong. Please try again.');
      })
      .finally(() => {
        setLoading(false);
        setName('');
        setPrice('');
        setDescription('');
      });
  };

  const handleDelete = (id) => {
    if (confirm('Rostdan ham o`chirmoqchimisiz?')) {
      backend.delete(`products/${id}`)
        .then(() => {
          setPhones((prevPhones) => prevPhones.filter((phone) => phone.id !== id));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('O`chirilmadi!');
    }
  };

  return (
    <div>
      <div className="max-w-[1200px] mx-auto mt-[50px] bg-yellow-300 mb-[50px]">
        <form className="w-[600px] mx-auto flex flex-col gap-4 my-6 bg-green-500 p-4 rounded-md">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter phone name ...."
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter phone price...."
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 p-3 rounded-md"
            placeholder="Enter description..."
          ></textarea>
          <button onClick={handleSend} className="bg-blue-600 py-3 rounded-md text-white">
            SEND
          </button>
        </form>
        {!loading && phones.length > 0 && phones.map((phone, index) => (
          <Card deleteItem={handleDelete} key={phone.id || index} phone={phone} />
        ))}
        {loading && (
          <div className="max-w-[100px] mt-[100px] mx-auto ">
            <SyncLoader color="#0e6aef" />
          </div>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default App;
