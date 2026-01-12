export function useFilter({ searchItem, countries }) {
    const filteredCountries = countries?.filter((country) =>
        country.name.common.toLowerCase().includes(searchItem.toLowerCase())
    );

    const filteredContinents = countries?.filter((country) =>
        country.region.toLowerCase().includes(searchItem.toLowerCase())
    );

    return { filteredCountries, filteredContinents };
}
