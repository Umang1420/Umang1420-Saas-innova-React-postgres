export default function profile({user}){
    return (
        <>
        <section>
            <h1>{user.name}</h1>
            <h3>{user.skill}</h3>
            <h3>{user.bio}</h3>
            <img src={user.img} alt="user profile" />
        </section>
        </>
    )
}