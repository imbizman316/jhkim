import Navbar from "../Navbar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function ServerNavbar() {
  const session = await getServerSession(options);

  return <Navbar session={session} />;
}

export default ServerNavbar;
