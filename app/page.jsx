import PageTitle from "@/components/pageTitle";
import BarChart from "@/components/ui/barChart";
import Card, { CardContent } from "@/components/ui/dashboardCard";
import SalesCard from "@/components/ui/salesCard";
import { DollarSign, Users, CreditCard } from "lucide-react";

export default function Home() {
  const cardData = [
    {
      label: "Total Revenue",
      amount: "$45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      label: "Subscriptions",
      amount: "+2350",
      description: "+180.1% from last month",
      icon: Users,
    },
    {
      label: "Sales",
      amount: "+12,234",
      description: "+19% from last month",
      icon: CreditCard,
    },
    {
      label: "Active Now",
      amount: "+1,234",
      description: "+19% from last month",
      icon: CreditCard,
    },
  ];

  const userSalesData = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      saleAmount: "+$1,999.00",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      saleAmount: "+$1,999.00",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      saleAmount: "+$39.00",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      saleAmount: "+$39.00",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      saleAmount: "+$39.00",
    },
    { name: "William Kim", email: "will@email.com", saleAmount: "+$299.00" },
  ];

  return (
    <div className="flex flex-col w-full gap-5">
      <PageTitle title="Dashboard" />

      <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map(({ label, amount, description, icon: Icon }, index) => (
          <Card
            key={index}
            amount={amount}
            description={description}
            label={label}
            icon={Icon}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart />
        </CardContent>

        <CardContent className="flex flex-col gap-4 p-4">
          <div>
            <p className="font-semibold">Recent Sales</p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
          </div>
          {userSalesData.map(({ name, email, saleAmount }, index) => (
            <SalesCard
              key={index}
              name={name}
              email={email}
              saleAmount={saleAmount}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
