import { useRouter } from 'next/router'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <h1>Blog Post</h1>
      <p>Slug: <strong>{slug}</strong></p>
    </div>
  )
}
