import Head from 'next/head';
import SortableTodoList from './components/SortableTodoList';

const Home = () => {
  return (
    <>
      <Head>
        <title>ToDo List</title>
      </Head>
      <main>
        <SortableTodoList />
      </main>
    </>
  );
};

export default Home;