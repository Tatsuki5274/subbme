import PrivateRoute from "components/wrapper/PrivateRoute";
import ServiceCreateTemplate from "../templates/ServiceCreateTemplate";

export default function ServiceCreate() {
  return (
    <PrivateRoute>
      <ServiceCreateTemplate />
    </PrivateRoute>
  );
}
