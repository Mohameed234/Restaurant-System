<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /** USER: Create Booking */
    public function store(Request $request)
    {
        $request->validate([
            'name'         => 'required|string|max:255',
            'phone'        => 'required|string|max:20',
            'date'         => 'required|date|after_or_equal:today',
            'time'         => 'required',
            'guests_count' => 'required|integer|min:1',
            'notes'        => 'nullable|string'
        ]);

        $booking = Booking::create([
            'user_id'      => $request->user()->id,
            'name'         => $request->name,
            'phone'        => $request->phone,
            'date'         => $request->date,
            'time'         => $request->time,
            'guests_count' => $request->guests_count,
            'notes'        => $request->notes,
            'status'       => 'pending',
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Booking created successfully.',
            'booking' => $booking
        ]);
    }

    /** USER: Show My Bookings */
    public function myBookings(Request $request)
    {
        return Booking::where('user_id', $request->user()->id)->get();
    }

    /** ADMIN: Get All Bookings */
    public function index()
    {
        return Booking::orderBy('date', 'asc')->orderBy('time', 'asc')->get();
    }

    /** ADMIN: Update Status */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected,pending'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->status = $request->status;
        $booking->save();

        return response()->json([
            'status'  => true,
            'message' => 'Booking status updated.',
            'booking' => $booking
        ]);
    }
}
