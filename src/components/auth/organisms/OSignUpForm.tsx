import { useFormik } from "formik"
import { signUpUser } from "repositories/User"

export default function(){
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async(values) => {
            const user = await signUpUser(values.username, values.password)
            console.log("user", user)
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <input type="text" name="username" onChange={formik.handleChange} />
            <input type="password" name="password" onChange={formik.handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
}