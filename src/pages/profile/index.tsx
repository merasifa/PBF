import Link from 'next/link'

const ProfilePage = () => {
	return (
		<div>
			<h1>Profile Page</h1>
			<p>Nama: Tiara Mera Sifa</p>
			<p>NIM: 2341720247</p>
			<Link href="/profile/edit">Edit</Link>
		</div>
	)
}

export default ProfilePage
