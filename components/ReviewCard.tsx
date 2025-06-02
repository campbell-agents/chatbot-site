type Review = {
  name: string;
  content: string;
};

export default function ReviewCard(review: Review) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
     <p className="font-semibold">{review.name}</p>
<p className="mt-1 text-sm">{review.content}</p>
    </div>
  );
}