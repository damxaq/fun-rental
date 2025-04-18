import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddressRoute() {
  const { getAllCountries, getCountryByValue } = useCountries();

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>
      <form>
        <div className="w-3/5 mx-auto">
          <div className="mb-5">
            <Select required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {/* TODO: Flags dont work on windows: https://stackoverflow.com/questions/54519758/flag-emojis-not-rendering/54663926 */}
                      {country.flag} {country.label} / {country.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </>
  );
}
