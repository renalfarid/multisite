// example data 
/**
 {
  name: 'This is Site 1',
  template: '001',
  description: 'Subdomain only',
  subdomain: 'test1'
}
{
  name: 'This is Site 2',
  template: '002',
  description: 'Subdomain only',
  subdomain: 'test2'
}
 */
// Dummy data to be replaced with your database
interface Hostname {
    name: string;
    template: string;
    description: string;
    subdomain?: string;
    customDomain?: string;
    defaultForPreview?: boolean;
  }
  
  const hostnamesDB: Hostname[] = [];
  const NUM_SUBDOMAINS = 10; // Change this number to the desired number of subdomains (N)
  
  // Generate subdomains dynamically
  for (let i = 1; i <= NUM_SUBDOMAINS; i++) {
    const subdomain = `test${i}`;
    hostnamesDB.push({
      name: `This is Site ${i}`,
      template: `00${i}`,
      description: 'Subdomain only',
      subdomain,
    });
  }
  
  const DEFAULT_HOST = hostnamesDB.find((h) => h.defaultForPreview);
  
  /**
   * Returns the data of the hostname based on its subdomain or custom domain
   * or the default host if there's no match.
   *
   * This method is used by middleware.ts
   */
  export async function getHostnameDataOrDefault(
    subdomainOrCustomDomain?: string
  ): Promise<Hostname> {
    if (!subdomainOrCustomDomain) return DEFAULT_HOST as Hostname;
  
    // check if site is a custom domain or a subdomain
    const customDomain = subdomainOrCustomDomain.includes('.');
  
    // fetch data from the mock database using the site value as the key
    return (
      hostnamesDB.find((item) =>
        customDomain
          ? item.customDomain === subdomainOrCustomDomain
          : item.subdomain === subdomainOrCustomDomain
      ) ?? (DEFAULT_HOST as Hostname)
    );
  }
  
  /**
   * Returns the data of the hostname based on its subdomain.
   *
   * This method is used by pages under middleware.ts
   */
  export async function getHostnameDataBySubdomain(
    subdomain: string
  ): Promise<Hostname | undefined> {
    return hostnamesDB.find((item) => item.subdomain === subdomain);
  }
  
  /**
   * Returns the paths for `getStaticPaths` based on the subdomain of every
   * available hostname.
   */
  export async function getSubdomainPaths(): Promise<{ params: { site: string } }[]> {
    // get all sites that have subdomains set up
    const subdomains = hostnamesDB.filter((item) => item.subdomain);
  
    // build paths for each of the sites in the previous two lists
    return subdomains.map((item) => {
      return { params: { site: item.subdomain as string } };
    });
  }
  
  export default hostnamesDB;
  