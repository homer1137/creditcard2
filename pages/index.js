import Head from 'next/head'
import CreditCard from '../components/CreditCard'



export default function Home() {
  return (
    <div>
      <Head>
        <title>Credit card form</title>
        <meta name="description" content="Credit card form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CreditCard/>
      </main>

  
    </div>
  )
}
