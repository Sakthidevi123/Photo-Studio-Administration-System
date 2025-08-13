
    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);

    create table bookings (
        assigned_staff_id bigint,
        id bigint not null auto_increment,
        scheduled_at datetime(6) not null,
        service_item_id bigint,
        customer_email varchar(255),
        customer_name varchar(255) not null,
        status varchar(255),
        time_slot varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_deliveries (
        booking_id bigint not null,
        id bigint not null auto_increment,
        notes varchar(255),
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table photo_delivery_items (
        delivery_id bigint not null,
        photo_url varchar(255)
    ) engine=InnoDB;

    create table service_items (
        active bit,
        duration_min integer,
        price decimal(38,2) not null,
        id bigint not null auto_increment,
        category varchar(255),
        description varchar(255),
        name varchar(255) not null,
        primary key (id)
    ) engine=InnoDB;

    create table staff (
        id bigint not null auto_increment,
        email varchar(255),
        full_name varchar(255) not null,
        role varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table staff_skills (
        staff_id bigint not null,
        skill varchar(255)
    ) engine=InnoDB;

    alter table bookings 
       add constraint FKnv5vra97r80x2iur3q6nrtlrg 
       foreign key (assigned_staff_id) 
       references staff (id);

    alter table bookings 
       add constraint FKja1x7n58l43gvh30c8gld4x7f 
       foreign key (service_item_id) 
       references service_items (id);

    alter table photo_deliveries 
       add constraint FKqurb21o0h03xh54242ogppfm0 
       foreign key (booking_id) 
       references bookings (id);

    alter table photo_delivery_items 
       add constraint FK24fwuhmqvtol4lhc0vududmdv 
       foreign key (delivery_id) 
       references photo_deliveries (id);

    alter table staff_skills 
       add constraint FKoggffssaaj2mbjpt3hsu1s23d 
       foreign key (staff_id) 
       references staff (id);
