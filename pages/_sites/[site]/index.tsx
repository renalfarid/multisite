import { useRouter } from "next/router";
// we will create these in the next step
import { getHostnameDataBySubdomain, getSubdomainPaths } from "../../../lib/db";
import { useEffect, useState } from "react";


// Our types for the site data
export interface Props {
  name: String
  template: String
  description: String
  subdomain: String
  customDomain: String
}

export default function Index(props: Props) {
  const router = useRouter()
  const [templateHtml, setTemplateHtml] = useState<string | null>(null);

  useEffect(() => {
    if (!props.template) {
      return;
    }

  // Fetch the template HTML from the API route
  fetch(`/api/template?template=${props.template}`)
  .then((response) => response.text())
  .then((html) => {
    setTemplateHtml(html);
  })
  .catch((error) => {
    console.error("Error fetching template HTML:", error);
  });
}, [props.template]);

  if (router.isFallback) {
    return (
      <>
        <p>
          Loading...
        </p>
      </>
    )
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: templateHtml || '' }} />
  );
  
}

// Getting the paths for all the subdomains in our database
export async function getStaticPaths() {
  const paths = await getSubdomainPaths()

  return {
    paths,
    fallback: true
  }
}

// Getting data to display on each custom subdomain
export async function getStaticProps({ params: { site } }: { params: { site: string } }) {
  const sites = await getHostnameDataBySubdomain(site)
  console.log(sites)

  return {
    props: sites,
    revalidate: 3600
  }
}