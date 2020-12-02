import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import { GetServerSideProps } from 'next';
import {Title} from '../styles/pages/Home'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import {Document} from 'prismic-javascript/types/documents'
import Link from 'next/link'
interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({recommendedProducts}:HomeProps) {

  return (
    <div>
      <SEO 
      title='DevCommerce, your bets e-commerce!' 
      image="github-mark.png"
      shouldExcludeTitleSuffix
      />

      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(item =>{
            return (
              <li key={item.id}>
              <Link href={`/catalog/products/${item.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(item.data.title)}
                </a>
              </Link>
            </li>
            )
          })}
        </ul>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])
  
  
  return {
    props:{
      recommendedProducts: recommendedProducts.results,
    }
  }
}
