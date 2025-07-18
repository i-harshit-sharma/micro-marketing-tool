export default async function Page({ params }) {
    const { link } = await params
    return <div>My Post: {link}</div>
}