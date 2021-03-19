import { useFormik } from "formik"

export default function(){
    const formik = useFormik({
        initialValues: {
            username: ""
        },
        onSubmit: (values) => {
            firebase
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <input type="text" name="username" onChange={formik.handleChange} />
            {JSON.stringify(formik.values, null, 2)}
        </form>
    )
}