'use client';

import Link from "next/link";
import '@/app/globals.css';
import x from '@/styles/app.module.css';
import TableExample from "@/components/app.table";
import useSWR from "swr";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ModalExample from "@/components/create.modal";
import UpdateModal from "@/components/update.modal";
// import TableExample from "@/components/app.table";

export default function Home() {
  // const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [blog, setBlog] = useState<BlogData>();

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(
    `https://67cff383823da0212a83efee.mockapi.io/blogs`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // useEffect(() => {
  //   const fetchBlogData = async () => {
  //     const data = await fetch('https://67cff383823da0212a83efee.mockapi.io/blogs')
  //     const blogs = await data.json();

  //     console.log('>>> blogs', blogs);
  //     setBlogData(blogs);

  //   };

  //   fetchBlogData();
  // }, []);

  const handleEdit = (item: BlogData) => {
    setBlog(item);
    setUpdateModal(true);
  };

  return (
    <div>
      <ul>
        <li className={x.red}>
          <Link href={"/about"} className="nav-link">
            <h2>About</h2>
          </Link>
        </li>
        <li className={x['blue']} >
          <Link href={"/youtube"}>
            <h2>Youtube</h2>
          </Link>
        </li>

        <li className={x['blue']} >
          <Link href={"/test-sidebar"}>
            <h2>Sidebar</h2>
          </Link>
        </li>
      </ul>

      <div className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>
          List Blogs
        </h3>
        <Button variant="success" onClick={() => setShowModalCreate(true)}>Add Blog</Button>
      </div>

      <TableExample
        data={data?.sort((a: BlogData, b: BlogData) => b.id - a.id)}
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Title", accessor: "title" },
          { header: "Author", accessor: "author" },
          { header: "Content", accessor: "content" },
        ]}
        onEdit={handleEdit}
      />

      <ModalExample createModal={showModalCreate} setCreateModal={setShowModalCreate} />

      {blog && (
        <UpdateModal
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          blogBase={blog}
          setBlogBase={setBlog}
        />
      )}
    </div>
  );
}