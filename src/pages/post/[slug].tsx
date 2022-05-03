/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <main className={commonStyles.container}>
      <article className={styles.post}>
        <header className={styles.header}>
          <img src={post.data.banner.url} alt="banner" />
        </header>
        <h1>{post.data.title}</h1>
        <div className={commonStyles.info}>
          <time>
            <AiOutlineCalendar />
            <span>{post.first_publication_date}</span>
          </time>
          <span>
            <AiOutlineUser />
            <span>{post.data.author}</span>
          </span>
          <span>
            <BiTime />
            <span>{post.data.author}</span>
          </span>
        </div>

        {/*         <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.data.content }}
        /> */}
      </article>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug));

  const post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      'ee MMM yyyy',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: {
        heading: response.data.content[0].heading,
        body: response.data.content[0].body,
      },
    },
  };

  console.log(post.data.content);

  return {
    props: {
      post,
    },
    revalidate: 60 * 60,
  };
};
