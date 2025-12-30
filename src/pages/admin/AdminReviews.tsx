import { useEffect, useState } from 'react';
import { toast } from '../../components/ui/Toaster';

interface Review {
  id: number;
  product_id: number;
  product_name?: string;
  user_name: string;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews', { credentials: 'include' });
      const data: any = await res.json();
      setReviews(data.reviews || []);
    } catch (error) {
      toast('Failed to load reviews', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update');
      toast('Review status updated', 'success');
      loadReviews();
    } catch (error) {
      toast('Failed to update review', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete');
      toast('Review deleted', 'success');
      loadReviews();
    } catch (error) {
      toast('Failed to delete review', 'error');
    }
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Reviews</h1>
        <p className="text-muted-foreground">Moderate product reviews</p>
      </div>

      <div className="card overflow-hidden">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="bg-muted/50">
                <th>Product</th>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    No reviews found
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id}>
                    <td className="font-medium text-foreground">
                      {review.product_name || `Product #${review.product_id}`}
                    </td>
                    <td>{review.user_name}</td>
                    <td className="text-warning">{renderStars(review.rating)}</td>
                    <td className="max-w-xs">
                      <p className="line-clamp-2 text-sm text-muted-foreground">{review.comment}</p>
                    </td>
                    <td>
                      <select
                        value={review.status}
                        onChange={(e) => handleStatusChange(review.id, e.target.value)}
                        className="input h-8 text-xs w-24"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="btn btn-ghost btn-sm text-destructive"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
