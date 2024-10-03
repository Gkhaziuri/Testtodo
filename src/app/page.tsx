import Head from 'next/head';
// import SortableTodoList from './components/SortableTodoList';
import ColorButton from './components/ColorButton';


const Home = () => {
  return (
    <>
      <Head>
        <title>ToDo List</title>
      </Head>
      <main>
        {/* <SortableTodoList /> */}
        <ColorButton />

      </main>
    </>
  );
};

export default Home;